export const TypeList = (props) =>{
   
    const data = props.typedata;

    const style = {
        backgroundColor: data.color,
    }
    return(
        <li style={{listStyle: "none"}}>
             <span className="type" style={style}><img src={data.url} alt=""  />{data.type}</span>
        </li>
    )
}