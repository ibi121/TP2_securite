import ReCAPTCHA from "react-google-recaptcha"

function onChange(value) {
  console.log("Captcha value:", value)
}

export default function App() {
  return <ReCAPTCHA sitekey={"6LdUN5EmAAAAAApe89bxMRqtp9PhwpS_8pWc26t_"} onChange={onChange} />
}
