import { Helmet } from 'react-helmet-async';

export const Head = ({ title = '', description = '' }) => {
  return (
    <Helmet title={title ? `${title} | Хөтөлбөр` : undefined} defaultTitle="Хөтөлбөр">
      <meta name="description" content={description} />
    </Helmet>
  );
};
