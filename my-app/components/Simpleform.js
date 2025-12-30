import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Simpleform(){

    const{register, handleSubmit, setValue, watch} = useForm({
    defaultValues: {
      userName: '',
      address: '',
      password: '',
      country: '',
      occupation: '',
      age: ''

    },
  });

const watchUsername = watch('userName')

useEffect(()=>{
   let data = {
    userName: 'Homer Simpson',
    address: '203/2 Kopiwatta Minuwangoda',
    password: '',
    country: 'Sri Lanka',
    occupation: 'student',
    age: 21
    
   }

   for (const prop in data){
    setValue(prop, data[prop])
   }
}, []);

function submitForm(data){
    console.log(`Form submitted : Username ${data.userName, data.password}`)
}

return (
    <form onSubmit= {handleSubmit(submitForm)}>
        User Name: {watchUsername}
        <br />
        <input {...register("userName")} /> <br /> <br />

        Age:
        <br />
        <input type='number' {...register('age',{required: true, min:18, max:99, })}/> <br/>
        <br/>

        Address: <br />
        <textarea {...register("address")} ></textarea> <br /><br />

        Country: <br/>
        <select {...register("country")}>
        <option value="Sri Lanka">Sri Lanka</option>
        <option value="Australia">Seneca at York</option>
        <option value="England">Newnham</option>
        <option value="New Zeland">Markham</option>
      </select><br /><br />

        Occupation: <br />
        <input type="radio" value="student" {...register("occupation")} /> Student<br />
        <input type="radio" value="teacher" {...register("occupation")} /> Teacher<br />
        <input type="radio" value="janitor" {...register("occupation")} /> Janitor <br /><br />

        Password: <br />
        <input type='password' {...register('password')} />

        <button type="submit" onSubmit={submitForm}> Submit </button>



    </form>
)



}