module.exports=function calculateRisk({ heartRate,spo2,skinTemp}){
    let risk = 0;
    if (heartRate>110||heartRate<50)risk+=30;
    if(spo2<92)risk+=40;
    if (skinTemp>38)risk+=30;
    return Math.min(risk,100);
};