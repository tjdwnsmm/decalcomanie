import '../../style/orbit-style.css';

const Logo = () => {
  const numOfElements = 200; // Number of elements you want to create

  return (
    <div className="wrap">
      {Array.from({ length: numOfElements }, (_, index) => (
        <div key={index} className="c"></div>
      ))}
    </div>
  );
};

export default Logo;
