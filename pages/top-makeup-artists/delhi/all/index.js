export const getServerSideProps = () => {
    return {
      redirect: {
        permanent: true,
        destination: '/makeup-artists/delhi/all',
      },
    };
  };
  
  export default function Index() {
    return null;
  }
  