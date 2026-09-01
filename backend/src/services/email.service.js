const sendEmail = async ({ to, subject }) => {
  console.log(`Email send to ${to}`);
  console.log(`Subject: ${subject}`);
  return true;
};

export default sendEmail;
