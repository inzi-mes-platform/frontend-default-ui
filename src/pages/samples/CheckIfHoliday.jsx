import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

// import { createRestTemplate } from "./framework/utils/RestTemplate";

// const restTemplate = createRestTemplate();

const CheckIfHoliday = (props)=>{

    const location = useLocation();
    const task = location.state !== undefined && location.state !== null ? location.state.task:{};
    const [isHoliday, setIsHoliday] = React.useState(false);

    const navigate = useNavigate();

    const handleOnCheckboxClick = (e) => {
        setIsHoliday(!isHoliday);
    }

    const handleOnButtonClick = ()=>{
        if(task===null || task===undefined) {
            console.log("No task ID identified!")
            return;
        }

        const params = {
            taskId: task.taskId,
            isHoliday: isHoliday
        }
        // restTemplate.post("http://localhost:8000/do-work/check-if-holiday", params, (reply, error)=>{
        //     navigate('/todo-list');
        // });
    }

    return(
        <div>
            <h4>Check if holiday</h4>
            <input type="checkbox" id="isHoliday" name="isHoliday" onChange={ handleOnCheckboxClick }/>
            <label htmlFor="isHoliday">휴일여부</label>
            <div>
                <button onClick={ handleOnButtonClick } style={{ "cursor" : "pointer" }}>확인</button>
            </div>
        </div>
    )
}

export default CheckIfHoliday;
