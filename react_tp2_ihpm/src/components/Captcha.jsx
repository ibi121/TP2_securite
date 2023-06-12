import ReCAPTCHA from "react-google-recaptcha"

function onChange(value) {
  console.log("Captcha value:", value)
}

export default function App() {
  return <ReCAPTCHA sitekey="6LcOB5AmAAAAAKs3yNejvhuFz3O-tKTOXrEQJ1wa" onChange={onChange} />
}
