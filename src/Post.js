import { useState } from "react"

export default function Post ({ title, description, dateCreated,  author, completed, functionCheck}) {

    // const bool = false;

    //const[bool,setBool] = useState(false);



    const date = new Date();
    // const[dateCreated, setDateCreated] = useState(date.toDateString());

    function handleCheck(){
        //setBool(!bool);
        functionCheck(title);
    }

    function renderDateCompleted(){
        if(completed){
            return(
            <>
            <br/>
            <i>
                Completed Date:&nbsp; &nbsp;<b>{date.toDateString()+"  "+date.toLocaleTimeString()}</b>
            </i>
            </>
            );
        }
    }

    // setterDateCompleted();
    // const []

    
        return (
            <div style={{ padding: '10px' }}>
                <h2>{title}</h2>
                <i>{description}</i><br/>
                <br/>
                <i>
                    Created Date: &nbsp; &nbsp; &nbsp;  <b>{dateCreated}</b>
                    </i>
                    <br/>
                <i>
                    <label htmlFor="dateCompleted">Task Completed?: </label>
                    <input type ="checkbox" name ="dateCompleted" id ="dateCompleted" checked={completed} onChange={handleCheck} />
                </i> 
                {renderDateCompleted()}
                <br/>
                <i>
                    Written by:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>{author}</b>
                </i>
                    
            </div>
        )
    }


    


