import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';


function StudyCalendar(props) {

    var body = []
    
    const link = (planner) => {
        
        props.StudyPlanners.map(OneStudyPlanner=>{
            OneStudyPlanner.component.map(One=>{
                if(Number(One.id) ===Number(planner.publicId)){
                    props.dispatch({type:'StudyPlanner'})
                    props.OneStudyPlannerBtn(OneStudyPlanner)
                }
            })
        })
    }

    if(props.StudyPlanners){    
        
        props.StudyPlanners.map(OneStudyPlanner=>{                     
            try{
                if(Number(OneStudyPlanner.component.length) === 0){
                    return null;
                }
                else{

                    OneStudyPlanner.component.map(one=>{
                        var local_body;
                        if(one.User_key!==Number(props.token['id'])){
                            return null;
                        }   

                        if(one.condition === 0){
                            local_body = {id:one.id,title:one.title,start:moment(one.StudyPlannerComponentStartTime).format('YYYY-MM-DD'),
                                end:moment(one.StudyPlannerComponentStartTime).add(one.duration,'days').format('YYYY-MM-DD'),
                                color:'#FFFF33'}
                            body=[...body,local_body]
                            // setCalendarComponents([...CalendarComponents,local_body])
                        }
                        else if(one.condition === 1){
                            local_body = {id:one.id,title:one.title,start:moment(one.StudyPlannerComponentStartTime).format('YYYY-MM-DD'),
                                end:moment(one.StudyPlannerComponentStartTime).add(one.duration,'days').format('YYYY-MM-DD'),
                                color:'#66CC66'}
                            body=[...body,local_body]
                        }
                        else{
                            local_body = {id:one.id,title:one.title,start:moment(one.StudyPlannerComponentStartTime).format('YYYY-MM-DD'),
                                end:moment(one.StudyPlannerComponentStartTime).add(one.duration,'days').format('YYYY-MM-DD'),
                                color:'#FF9999'}
                            body=[...body,local_body]
                        }

                        return null;
                })}
            }
            catch{
                return null
            }
            return null
        })
    }

    return (

        <div id="StudyCalendar">
            
            {props.CalendarShowCond
                ?<section id="StudyCalendar body" className="card">
                    <section id="StudyCalendar body" className="card-body" style={{color:"black"}}> 
                        <FullCalendar 
                            plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                            initialView="dayGridMonth"
                            events={body}
                            eventTextColor="black"
                            nowIndicator
                            eventClick={(e)=>link(e.event._def)}
                        />
                    </section>
                </section>
                :<section id="StudyCalendar body" className="card">
                    <section id="StudyCalendar body" className="card-body" style={{color:"black",maxHeight:"70vh",overflowY:"auto"}}> 
                        <FullCalendar 
                            plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                            initialView="dayGridMonth"
                            events={body}
                            eventTextColor="black"
                            nowIndicator
                            eventClick={(e)=>link(e.event._def)}
                        />
                    </section>
                </section>
            }
            
        </div>
    )
}

export default StudyCalendar
