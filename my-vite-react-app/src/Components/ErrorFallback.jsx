/* eslint-disable react/prop-types */
function ErrorFallback({ error, resetErrorBoundary }) {
  console.error(error);
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  // Will work for errors caused by changing state, but not syntax errors
  return (
    <div>
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
      <button onClick={() => resetErrorBoundary()}>Try Again?</button>
    </div>
  );
}
export default ErrorFallback;
