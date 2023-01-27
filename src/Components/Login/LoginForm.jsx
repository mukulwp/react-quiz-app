import React from 'react'

const LoginForm = ({children, ...rest}) => {
  return (
    <form className='form' action="#" {...rest}>
      {children}
    </form>
  );
}

export default LoginForm