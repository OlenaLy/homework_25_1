import React from "react";

export default class List extends React.Component {
    
    render (){
        const { list, results, onClickSmile} = this.props;
        return (
            <div className="groupSmile">
                {list.map((element) => (
                    <div key={element} className="smileItem">
                         <div 
                            className="smile" 
                            onClick={() => onClickSmile(element)}>
                            {element}
                        </div>
                        <div className="smileCount">{results[element] || 0}</div>
                    </div>
                ))}
            </div>
        );
    }
}
