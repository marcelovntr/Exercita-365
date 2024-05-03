import { UsuariosContext } from '../../context/UsuariosContext';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './index.module.css';




function CadastroLocalExercicio() {

  const { usuarios, cadastrarUsuario, editarUsuario, apagarUsuario, lerUsuariosPorId,
    mostrarCadLocal, setCadLocal, mostrarEdicaoLocal, setMostrarEdicaoLocal, cadastrarLocais } = useContext(UsuariosContext);


  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const [cepPreenchido, setCepPreenchido] = useState(false);



  useEffect(() => { //< ------- EXECUTAR APENAS QDO A PÁGINA CARREGAR --> PARA EXIBIR LISTAS E AFINS

    lerLocais();
  }, [])

  const cadOnSubmit = (formValue) => {
    // Lógica para submeter os dados
    console.log(formValue);
    // setNovoLocal();
    cadastrarLocais(formValue);
  };


  const atualizarOnSubmit = (formValue) => {
    // Lógica para submeter os dados
    console.log(formValue);
    // setNovoLocal();
    editarLocais(formValue);
  };




  function buscarCEP(cep, setValue) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            setValue('endereco', data.logradouro);
            setValue('bairro', data.bairro);
            setValue('cidade', data.localidade);
            setValue('estado', data.uf);
            setCepPreenchido(true);
        })
        .catch(error => console.error('Erro ao buscar o CEP:', error));
}
const cepOnSubmit = (data) => {
  // Lógica para submeter os dados
  console.log(data);
  // Executar a busca do CEP
  buscarCEP(data.cep, setValue);
  // Restante da lógica de cadastro
};



  return (

   // INSERIR EXIBIÇÃO DE LOCAIS DO JASON
   <div className={styles.container}>








   <div className={styles.textual}>
     <h2>Área de Cadastro</h2>


   </div>


   {mostrarCadLocal && (
     <>


       <h2>Cadastrar Local</h2>
       <form className={styles.formlocais} onSubmit={handleSubmit(cadOnSubmit)}>


         <label htmlFor='nomeLocal'>Local:</label>
         <input type="text"
           placeholder='Praça XYX'
           {...register('nomeLocal', {
             required: 'Necessário o preenchimento',
             maxLength: { value: 100, message: 'Máximo de 100 caracteres' }
           })}
         />
         {errors.nomeLocal && <p>{errors.nomeLocal.message}</p>}


         <label htmlFor='descricaoLocal'>Descrição:</label>
         <input type='text'
           placeholder='descrição breve'
           {...register('descricaoLocal', {
             required: 'Necessária a descrição',
             maxLength: { value: 200, message: 'Máximo de 200 caracteres' }
           })} />
         {errors.descricaoLocal && <p>{errors.descricaoLocal.message}</p>}


         <label htmlFor='cep'>CEP:</label>
         <input type="text"
           placeholder='XXXXXXXX  - apenas números'
           {...register('cep',
             {
               required: 'Necessário o preenchimento',
               maxLength: { value: 8, message: 'Máximo de 8 caracteres' },
               pattern: { value: /^[0-9]*$/, message: 'Apenas números são permitidos' }
             })}
         />
         {errors.cep && <p>{errors.cep.message}</p>}


        
         <button type="button" onClick={handleSubmit(cepOnSubmit)}>Buscar CEP</button>
         <br />


         <label htmlFor='endereco'>Endereço:</label>
         <input type="text"
         placeholder='Nome da rua'
         {...register('endereco', { required: cepPreenchido ? 'Necessário o preenchimento' : false,})} />
             {errors.endereco && <p>{errors.endereco.message}</p>}


         <label htmlFor='bairro'>Bairro:</label>
         <input type="text"
         placeholder='Nome do bairro'
         {...register('bairro',{ required: cepPreenchido ? 'Necessário o preenchimento' : false,})} />
         {errors.bairro && <p>{errors.bairro.message}</p>}


         <label htmlFor='cidade'>Cidade:</label>
         <input type="text"
         placeholder='Nome da cidade'
         {...register('cidade', { required: cepPreenchido ? 'Necessário o preenchimento' : false,})} />
         {errors.cidade && <p>{errors.cidade.message}</p>}


         <label htmlFor='estado'>Estado:</label>
         <input type="text"
         placeholder='(XY) - apenas a sigla'
         {...register('estado',
         { required: cepPreenchido ? 'Necessário o preenchimento' : false,
         maxLength: { value: 2, message: "máximo de 2 caracteres" },
         minLength: { value: 2, message: 'mínimo de 2 caracteres' },})} />
         {errors.estado && <p>{errors.estado.message}</p>}


         {/* ************************************************************************** */}
         <label>Latitude:</label>
         <input type="text"
         placeholder='Exemplo: -27.60782774761622'
         {...register('latitude', { required: cepPreenchido ? 'Necessário o preenchimento' : false,})} />
         {errors.latitude && <p>{errors.latitude.message}</p>}


         <label>Longitude:</label>
         <input type="text"
         placeholder='Exemplo: -40.60782774761622'
         {...register('longitude', { required: cepPreenchido ? 'Necessário o preenchimento' : false,})} />
         {errors.longitude && <p>{errors.longitude.message}</p>}




         <label htmlFor='praticasEsportivas'>Práticas Esportivas:</label>




         <fieldset name="praticasEsportivas">
           <br />
           <label htmlFor="caminhada">Caminhada</label>
           <input type="checkbox" id="caminhada" value="caminhada" {...register('praticasEsportivas')} />


           <br />
           <label htmlFor="corrida">Corrida</label>
           <input type="checkbox" id="corrida" value="corrida" {...register('praticasEsportivas')} />


           <br />
           <label htmlFor="musculação">Musculação</label>
           <input type="checkbox" id="musculação" value="musculação" {...register('praticasEsportivas')} />
           <br />
           <label htmlFor="natacao">Natação</label>
           <input type="checkbox" id="natacao" value="natação" {...register('praticasEsportivas')} />
           <br />
           <label htmlFor="surf">Surf</label>
           <input type="checkbox" id="surf" value="surf" {...register('praticasEsportivas')} />
           <br />


           <label htmlFor="skate">Skate</label>
           <input type="checkbox" id="skate" value="skate" {...register('praticasEsportivas')} />
           <br />
           <label htmlFor="esporteColetivo">Esporte Coletivos</label>
           <input type="checkbox" id="esporteColetivo" value="esportes coletivos" {...register('praticasEsportivas')} />
           {/* exemplo com handleCheckBox
                 <input type="checkbox" value="caminhada" onChange={controlarCheckbox} />
                 <label htmlFor="caminhada">Caminhada</label> */}
         </fieldset>






         <br />
         <button type="submit"> Cadastrar</button>
       </form>


     </>
   )}






   {mostrarEdicaoLocal && (
     <>
       <h2>Editar Local</h2>
       <form className={styles.formlocais} onSubmit={handleSubmit(atualizarOnSubmit)}>


         <label htmlFor='nomeLocal'>Local:</label>
         <input type="text"
           placeholder='Praça XYX'
           {...register('nomeLocal', {
             required: 'Necessário o preenchimento',
             maxLength: { value: 100, message: 'Máximo de 100 caracteres' }
           })}
         />
         {errors.nomeLocal && <p>{errors.nomeLocal.message}</p>}


         <label htmlFor='descricaoLocal'>Descrição:</label>
         <input type='text'
           placeholder='descrição breve'
           {...register('descricaoLocal', {
             required: 'Necessária a descrição',
             maxLength: { value: 300, message: 'Máximo de 300 caracteres' }
           })} />
         {errors.descricaoLocal && <p>{errors.descricaoLocal.message}</p>}


         <label htmlFor='cep'>CEP:</label>
         <input type="text"
           placeholder='XXXXXXXX  - apenas números'
           {...register('cep',
             {
               required: 'Necessário o preenchimento',
               maxLength: { value: 8, message: 'Máximo de 8 caracteres' },
               pattern: { value: /^[0-9]*$/, message: 'Apenas números são permitidos' }
             })}
         />
         {errors.cep && <p>{errors.cep.message}</p>}


         {/* REVER ISSO DO BOTAO!!!!!!!!!!!!!!!!!!!!!! */}
         <button type="button" onClick={() => buscarInformacoesCEP(novoLocal.cep)}>Buscar CEP</button>
         <br />


         <label htmlFor='endereco'>Endereço:</label>
         <input type="text" {...register('endereco')} />
         <label htmlFor='bairro'>Bairro:</label>
         <input type="text" {...register('bairro')} />
         <label htmlFor='cidade'>Cidade:</label>
         <input type="text" {...register('cidade')} />
         <label htmlFor='estado'>Estado:</label>
         <input type="text" {...register('estado')} />


         {/* ************************************************************************** */}
         <label>Latitude:</label>
         <input type="text" {...register('latitude')} />
         <label>Longitude:</label>
         <input type="text" {...register('longitude')} />




         <label htmlFor='praticasEsportivas'>Práticas Esportivas:</label>




         <fieldset name="praticasEsportivas">
           <br />
           <label htmlFor="caminhada">Caminhada</label>
           <input type="checkbox" id="caminhada" value="caminhada" {...register('praticasEsportivas')} />


           <br />
           <label htmlFor="corrida">Corrida</label>
           <input type="checkbox" id="corrida" value="corrida" {...register('praticasEsportivas')} />


           <br />
           <label htmlFor="musculação">Musculação</label>
           <input type="checkbox" id="musculação" value="musculação" {...register('praticasEsportivas')} />
           <br />
           <label htmlFor="natacao">Natação</label>
           <input type="checkbox" id="natacao" value="natação" {...register('praticasEsportivas')} />
           <br />
           <label htmlFor="surf">Surf</label>
           <input type="checkbox" id="surf" value="surf" {...register('praticasEsportivas')} />
           <br />


           <label htmlFor="skate">Skate</label>
           <input type="checkbox" id="skate" value="skate" {...register('praticasEsportivas')} />
           <br />
           <label htmlFor="esporteColetivo">Esporte Coletivos</label>
           <input type="checkbox" id="esporteColetivo" value="esportes coletivos" {...register('praticasEsportivas')} />
           {/* exemplo com handleCheckBox
                 <input type="checkbox" value="caminhada" onChange={controlarCheckbox} />
                 <label htmlFor="caminhada">Caminhada</label> */}
         </fieldset>






         <br />
         <button type="submit">Atualizar</button>
         <button onClick={()=>{setCadLocal(true); setMostrarEdicaoLocal(false)}}>Cadastrar Novo Local</button>
       </form>
     </>


   )}
 </div>

   
  );
}

export default CadastroLocalExercicio;