import React, { useState, useEffect } from 'react';

interface ColorScaleProps {
  url: string;
  title: string;
  unit: string;
}

interface ColorData {
  Color: [number, number, number];
  Value: number;
}

const ColorScale: React.FC<ColorScaleProps> = ({ url, title, unit }) => {
  const [colorData, setColorData] = useState<ColorData[]>([]);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setColorData(data))
      .catch((err) => console.error('Failed to load color scale:', err));
  }, [url]);

  if (colorData.length === 0) {
    return <div>Loading color scale...</div>;
  }

  return (
    <div style={{ margin: '30px 0' }}>
      <h4 style={{ marginBottom: '10px', fontWeight: 700 }}>{title}</h4>
      <div
        style={{
          display: 'flex',
          height: '60px',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          position: 'relative',
        }}
      >
        {colorData.map((item, index) => {
          const rgb = `rgb(${item.Color[0]}, ${item.Color[1]}, ${item.Color[2]})`;
          const isHovered = hoveredValue === item.Value;

          return (
            <div
              key={index}
              style={{
                flex: 1,
                backgroundColor: rgb,
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.2s ease',
                transform: isHovered ? 'scaleY(1.1)' : 'scaleY(1)',
                zIndex: isHovered ? 10 : 1,
              }}
              onMouseEnter={() => setHoveredValue(item.Value)}
              onMouseLeave={() => setHoveredValue(null)}
              title={`${item.Value}${unit}`}
            >
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#180057',
                    color: '#f4fffa',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    marginBottom: '4px',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  {item.Value}
                  {unit}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '8px',
          fontSize: '12px',
          color: 'var(--ifm-color-emphasis-600)',
          fontWeight: 300,
        }}
      >
        <span>
          {colorData[0].Value}
          {unit}
        </span>
        <span>
          {colorData[colorData.length - 1].Value}
          {unit}
        </span>
      </div>
    </div>
  );
};

export default ColorScale;
