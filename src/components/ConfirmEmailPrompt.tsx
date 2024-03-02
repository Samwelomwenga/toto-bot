function ConfirmEmailPrompt() {
  return (
    
    <div className="bg-yellow-200 p-8 shadow rounded-md absolute left-1/2 top-5 -translate-x-1/2 ">
      <p className="text-lg font-bold">Please confirm your email address.</p>
      <p>
        We`ve sent a confirmation link to your email. Check your inbox and click
        the link to complete the sign-up process.
      </p>
    </div>
  );
}

export default ConfirmEmailPrompt;
