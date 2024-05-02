import { UsuariosContext } from '../../context/UsuariosContext';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './index.module.css';




function CadastroLocalExercicio() {

  const { usuarios, cadastrarUsuario, editarUsuario, apagarUsuario, lerUsuariosPorId } = useContext(UsuariosContext);


  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();



  useEffect(() => { //< ------- EXECUTAR APENAS QDO A PÁGINA CARREGAR --> PARA EXIBIR LISTAS E AFINS

    lerLocais();
  }, [])

  function lerLocais() {
    fetch("http://localhost:3000/listaLocais")
      .then(response => response.json())
      .then(dados => setListaLocais(dados))
      .catch(erro => console.log(erro))
  }


  function cadastrarLocais(novoLocal) {
    fetch("http://localhost:3000/listaLocais", {
      method: "POST",
      body: JSON.stringify(novoLocal),
      headers: {
        'Content-Type': 'application/json',

      },
    }
    )
      .then(() => {
        alert('LOCAL adicionado com sucesso!')
        lerLocais();
      })
      .catch(() => alert('erro ao adicionar!'))
  }

  const onSubmit = (formValue) => {
    // Lógica para submeter os dados
    console.log(formValue);
    // setNovoLocal();
    cadastrarLocais(formValue);
  };


  return (

    // INSERIR EXIBIÇÃO DE LOCAIS DO JASON
    <div className={styles.container}>


    

        <div className={styles.textual}>
          <h2>Cadastro de Local de Exercício</h2>

        </div>

        <form className={styles.formlocais} onSubmit={handleSubmit(onSubmit)}>

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
          <button type="submit"> Cadastrar</button>
        </form>
      </div>

   
  );
}

export default CadastroLocalExercicio;