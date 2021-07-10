import React from 'react'
import "./InfoBox.css"
import {Card,CardContent,Typography}  from "@material-ui/core"
const InfoBox = ({title,cases,active,isRed,total,...props}) => {
    return (
        <Card className={`infoBox ${active && 'infoBox--active'} ${isRed && 'infoBox--red'}`} onClick={props.onClick}>
      
             
            <CardContent >
             <Typography className="infoBox__title"  color="textSecondary">
                 {title}
             </Typography>
             <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases__recovered'}`}> {cases}</h2>
             <Typography className="infoBox__total" color="textSecondary"> {total} Total</Typography>
            </CardContent>
           
        </Card>
    )
}

export default InfoBox
