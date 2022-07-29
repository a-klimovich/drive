// export const Title = (children) => {
//   return (
//     <h2
      
//     >
//       { children }
//     </h2>
//   )
// };


// import Container from '../helpers/Container';

export default function Title(props) {
  const { children } = props;

  return (
    <h2
      className="title"
      style={{fontWeigth: '700'}}
    >
      { children }
    </h2>
  )
}