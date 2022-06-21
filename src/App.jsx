import './estilos.css'
import { Formulario, Label,
        ContenedorTerminos, ContenedorBotonCentrado, MensajeExito, MensajeError, 
        Boton} from './elementos/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Inputs } from './componentes/Inputs';
import { useState } from 'react';

import './App.css';

function App() {
  const [usuario, setUsuario] = useState({campo: '', valido: null});
  const [nombre, setNombre] = useState({campo: '', valido: null});
  const [password, setPassword] = useState({campo: '', valido: null});
  const [password2, setPassword2] = useState({campo: '', valido: null});
  const [correo, setCorreo] = useState({campo: '', valido: null});
  const [telefono, setTelefono] = useState({campo: '', valido: null});
  const [terminos, setTerminos] = useState(false);
  const [formularioValido, setFormularioValido] = useState(null);

  const expresiones = {
		usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{4,12}$/, // 4 a 12 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

	const validarPassword2 = () => {
		if(password.campo.length > 0){
			if(password.campo !== password2.campo){
				setPassword2((prevState) => {
					return {...prevState, valido: 'false'}
				});
			} else {
				setPassword2((prevState) => {
					return {...prevState, valido: 'true'}
				});
			}
		}
	}

  function onChangeTerminos(e) {
    setTerminos(e.target.checked)
  }

  function onSubmit(e) {
    e.preventDefault()
    if(
			usuario.valido === 'true' &&
			nombre.valido === 'true' &&
			password.valido === 'true' &&
			password2.valido === 'true' &&
			correo.valido === 'true' &&
			telefono.valido === 'true' &&
			terminos
		){
			setFormularioValido(true);
			setUsuario({campo: '', valido: ''});
			setNombre({campo: '', valido: null});
			setPassword({campo: '', valido: null});
			setPassword2({campo: '', valido: 'null'});
			setCorreo({campo: '', valido: null});
			setTelefono({campo: '', valido: null});

			// ... 
		} else {
			setFormularioValido(false);
		}
  }



  return (
    <main>
      <Formulario action="" onSubmit={onSubmit}>
        <Inputs
          estado={usuario}
          setEstado={setUsuario}
          tipo='text'
          name='usuario'
          label='User'
          placeholder='E.g: carlos_123...'
          leyendaError='El usuario debe contener entre 4 y 16 carácteres y sólo pueden ser letras, números y guión bajo'
          expresionRegular={expresiones.usuario}
        />

        <Inputs
					estado={nombre}
					setEstado={setNombre}
					tipo="text"
					label="Name"
					placeholder="E.g: Carlos"
					name="usuario"
					leyendaError="El nombre sólo puede contener letras y espacios."
					expresionRegular={expresiones.nombre}
				/>
				<Inputs
					estado={password}
					setEstado={setPassword}
					tipo="password"
					label="Password"
					name="password1"
					leyendaError="La contraseña debe contener de 4 a 12 dígitos."
					expresionRegular={expresiones.password}
				/>
				<Inputs
					estado={password2}
					setEstado={setPassword2}
					tipo="password"
					label="Repeat Password"
					name="password2"
					leyendaError="Las contraseñas deben ser iguales."
					funcion={validarPassword2}
				/>
				<Inputs
					estado={correo}
					setEstado={setCorreo}
					tipo="email"
					label="E-mail"
					placeholder="carlos@mail.com"
					name="correo"
					leyendaError="El correo sólo puede contener letras, numeros, puntos, guiones y guión bajo."
					expresionRegular={expresiones.correo}
				/>
				<Inputs
					estado={telefono}
					setEstado={setTelefono}
					tipo="text"
					label="Phone"
					placeholder="0123456789"
					name="telefono"
					leyendaError="El teléfono sólo puede contener números."
					expresionRegular={expresiones.telefono}
				/>

        <ContenedorTerminos>
          <Label>
            <input 
              type='checkbox' 
              name='terminos' 
              id='terminos' 
              checked={terminos}
              onChange={onChangeTerminos}
            />
            I accept terms and conditions
          </Label>
        </ContenedorTerminos>
        {formularioValido === false && <MensajeError>
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle}/>
            <b>Error:</b> Por favor rellena el formulario correctamente.
          </p>
        </MensajeError>}
        <ContenedorBotonCentrado>
          <Boton type='submit'>Send</Boton>
          {formularioValido === true && <MensajeExito>¡Formulario enviado correctamente!</MensajeExito>}
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
}

export default App;
