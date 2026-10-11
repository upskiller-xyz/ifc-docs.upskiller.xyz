#!/usr/bin/env bash
set -euo pipefail
# Pull the licensed brand fonts into static/fonts/ so they are served from this
# site's own origin instead of from a public bucket URL.
#
# Why not just link to the bucket: AUTOMATE is licensed, and a licence that
# allows a self-hosted webfont on a licensed domain generally does not allow
# serving the file from an open bucket that anything can hotlink. The bytes are
# downloadable either way — a font a browser can render is a font anyone can
# save — so this is about the shape of the distribution, not secrecy.
#
# Why not fetch inside `docker build`: that would need the Scaleway key in the
# build, as a build-arg that lands in the image history or a BuildKit secret
# mount. Fetching here instead means the key stays on whoever runs this — the
# CI runner, or a developer — and `docker build` only ever sees files.
#
# Docusaurus copies static/ into build/ verbatim, and nginx serves build/, so the
# files end up at /fonts/<name> on the site's own origin. No CORS is involved
# at all: the request is same-origin.
#
# Usage:
#   bash scripts/fetch-assets.sh              # warn and continue if unavailable
#   bash scripts/fetch-assets.sh --require    # fail instead (CI, deploys)
#
# Credentials: the standard aws CLI environment or a configured profile. The
# bucket is S3-compatible, so AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY hold
# the Scaleway access key and secret key.

REQUIRE=false
FORCE=false
for arg in "$@"; do
  case "$arg" in
    --require) REQUIRE=true ;;
    # Without this, an existing file is kept — which is what makes repeated
    # runs cheap, but also means a placeholder or a truncated download is never
    # replaced. --force re-fetches unconditionally.
    --force)   FORCE=true ;;
    *) echo "unknown argument: $arg" >&2; exit 2 ;;
  esac
done

BUCKET="${ASSET_BUCKET:-upskiller-website}"
ENDPOINT="${S3_ENDPOINT:-https://s3.fr-par.scw.cloud}"
FONT_PREFIX="${FONT_PREFIX:-upskiller/fonts}"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$REPO_ROOT/static/fonts"

FONTS=(AUTOMATELight.woff AUTOMATEBold.woff)

fail_or_warn() {
  if $REQUIRE; then
    echo "error: $*" >&2
    exit 1
  fi
  echo "warning: $*" >&2
  echo "         the site will render in the fallback face; run with credentials to fix" >&2
  exit 0
}

command -v aws >/dev/null || fail_or_warn "aws CLI not found"

mkdir -p "$DEST"

for f in "${FONTS[@]}"; do
  if [[ -s "$DEST/$f" ]] && ! $FORCE; then
    echo "  have $f (--force to re-fetch)"
    continue
  fi
  if aws s3 cp "s3://$BUCKET/$FONT_PREFIX/$f" "$DEST/$f" --endpoint-url "$ENDPOINT" --only-show-errors; then
    echo "  fetched $f"
  else
    rm -f "$DEST/$f"
    fail_or_warn "could not fetch $f from s3://$BUCKET/$FONT_PREFIX/"
  fi
done

# A zero-byte file would be served as a broken font rather than failing loudly.
for f in "${FONTS[@]}"; do
  [[ -s "$DEST/$f" ]] || fail_or_warn "$f is missing or empty after the fetch"
done

echo "fonts ready in static/fonts/"
