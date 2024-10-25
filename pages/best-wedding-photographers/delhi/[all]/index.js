export const getServerSideProps = ({params, req, res}) => {
  const { all: slug } = params;

    return {
      redirect: {
        permanent: true,
        destination: `/wedding-photographers/delhi/${slug}`,
      },
    };
  };
  
  export default function Index() {
    return null;
  }
  