import React, { useState } from 'react';
import { Carousel } from 'antd';
import { CollectionImage } from 'Models/CollectionImage';
import "./styles.scss";

const contentStyle: React.CSSProperties = {
  width: '100%',
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

type Props = {
  data: CollectionImage[];
};

const Slides: React.FC<Props> = (props: Props) => {
  const [data,setData] = useState(props.data); 
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange} autoplay>
      {
        data.map((e,index) => (
          <div key={index}>
            <img src={e.Src}/>
          </div>
        ))
      }
    </Carousel>
  );
};

export default Slides;