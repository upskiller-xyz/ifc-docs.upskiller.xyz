import {useEffect} from 'react';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const history = useHistory();
  const target = useBaseUrl('/ifc-daylight-factor/intro');

  useEffect(() => {
    history.replace(target);
  }, [history, target]);

  return null;
}
