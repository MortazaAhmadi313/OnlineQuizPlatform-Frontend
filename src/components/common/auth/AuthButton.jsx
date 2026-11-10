function AuthButton({
  children,
  isLoading = false,
  loadingText = 'Please wait...',
  ...props
}) {
  return (
    <button
      type="submit"
      disabled={isLoading || props.disabled}
      className="group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200/80 active:translate-y-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
      {...props}
    >

      {isLoading ? (
        <>
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}

    </button>
  )
}

export default AuthButton
