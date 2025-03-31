import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { createRestTemplate, withBookmarkEnabler } from "inzi-mes-platform-frontend-framework";

const restTemplate = createRestTemplate();

const CheckIfHoliday = (props)=>{

    // Tab 방식에서는 무용지물임 => 웹브라우저 상의 주소창에 있는 state를 가져올 것이기 때문
    // HOC 방식을 적용하면 Tab 방식일 경우에도 북마크 등의 처리를 상위 컴포넌트에서 처리가 가능함
    const location = useLocation();
    const task = location.state !== undefined && location.state !== null ? location.state.task:{};
    const [isHoliday, setIsHoliday] = React.useState(false);

    const navigate = useNavigate();

    const { onCurrentPage } = props;

    React.useEffect(()=>{
        console.log("check if holiday");
        onCurrentPage({
            pathName: "/check-if-holiday",
            state : {
                param1 : "param1",
                param2 : "param2"
            }
        });
        return (()=>{
            console.log("exit check if holiday ui")
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnCheckboxClick = (e) => {
        console.log("###>handleOnCheckboxClick");
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

export const CheckIfHolidayWithBookmarkEnabler = withBookmarkEnabler(CheckIfHoliday);

export default CheckIfHolidayWithBookmarkEnabler;
