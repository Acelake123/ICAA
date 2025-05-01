

export default function Button({ children, type='button', textonly, className, ...props }){
  let cssClasses = textonly ? 'text-button' : 'button';
  cssClasses = ' '+cssClasses;
  return(
<button className={cssClasses} {...props} type={type} >
  {children}
</button>
  )
}