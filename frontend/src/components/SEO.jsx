import { Helmet } from "react-helmet-async";

const SITE_URL = "https://teamtask-app.netlify.app/";

const SEO = ({
  title = "TeamTask - Project & Task Management for Teams",
  description = "TeamTask is a free project and task management platform that helps teams organize projects, assign tasks, track progress, and collaborate efficiently.",
  path = "/",
  noIndex = false,
}) => {
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {!noIndex && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={canonicalUrl} />

      <meta property="og:type" content="website" />

      <meta property="og:site_name" content="TeamTask" />

      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
    </Helmet>
  );
};

export default SEO;
