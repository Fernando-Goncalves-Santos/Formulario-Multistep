import './App.css'
import {GrFormNext, GrFormPrevious} from 'react-icons/gr'
import {FiSend} from 'react-icons/fi'
import { useState } from 'react'
// Components
import UserForm from './components/UserForm'
import ReviewForm from './components/ReviewForm'
import Thanks from './components/Thanks'

// Hooks
import { useForm } from './hooks/useForm'
import Steps from './components/Steps'

const formTemplate = {
  name: "",
  email: "",
  review: "",
  comment: ""
}

function App() {
  const [data, setData] = useState(formTemplate) //Data = dados que persistirão no formulário

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return {...prev, [key]: value}
    })
  }

  // Feito um array de componentes para que possamos iterar por ele na exibição
  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler}/>,
    <ReviewForm data={data} updateFieldHandler={updateFieldHandler}/>,
    <Thanks data={data}/>
  ] 

  //Import do hook useForm
  const {currentStep, currentComponent, nextStep, prevStep, isLastStep, isFirstStep} = useForm(formComponents)

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep()
  }

  return (
    <>
    <div className="header">
      <h2>Deixe sua avaliação</h2>
      <p>Ficamos felizes com a sua compra, utilize o formulário abaixo para avaliar o produto</p>
    </div>
    <div className="form-container">
      <Steps currentStep={currentStep}/>
      <form onSubmit={handleSubmit}>
        <div className="inputs-container">{currentComponent}</div>
        <div className="actions">
          {!isFirstStep && (
            <button type="button" onClick={prevStep}>
            <GrFormPrevious/>
            <span>Voltar</span>
            </button>
          )}
          {!isLastStep ? (
            <button type="submit">
            <span>Avançar</span>
            <GrFormNext/>
          </button>
          ):
          (
            <button type="button">
            <span>Enviar</span>
            <FiSend/>
          </button>
          )}
        </div>
      </form>
    </div>
    
    </>
  )
}

export default App
