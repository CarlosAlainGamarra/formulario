import { Label, Input, GrupoInput, LeyendaError, IconoValidacion } from '../elementos/Formularios'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export function Inputs({estado, setEstado, tipo, name, label, placeholder, leyendaError, expresionRegular, funcion}) {
  function onChange(e) {
    setEstado({...estado, campo: e.target.value})
  }

  function validacion() {
    if(expresionRegular) {
      if(expresionRegular.test(estado.campo)) {
        setEstado({...estado, valido: 'true'})
      } else {
        setEstado({...estado, valido: 'false'})
      }
    }
    if(funcion){
      funcion()
    }
  }

  return (
    <div>
      <Label htmlFor={name} valido={estado.valido}>{label}</Label>
      <GrupoInput>
        <Input 
          type={tipo} 
          placeholder={placeholder} 
          id={name} 
          value={estado.campo}
          onChange={onChange}
          onKeyUp={validacion}
          onBlur={validacion}
          valido={estado.valido}
        /> 
        <IconoValidacion 
          icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} 
          valido={estado.valido} 
        />
      </GrupoInput>
      <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
  </div>
  )
}
