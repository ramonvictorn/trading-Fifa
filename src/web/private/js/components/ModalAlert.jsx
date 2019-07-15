import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCamera , faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner'
// import { timesCircle } from '@fortawesome/free-solid-svg-icons'
class ModalAlert extends Component {
    constructor(){
        super();
    }
    render(){
        let modalBody = '';
        if(this.props.status == 'loading'){
            // modalBody = <img className={'imgBall'} src={'/assets/soccerball.png'}></img>
            modalBody= <Loader type="Ball-Triangle" color="#663ab5" height={80} width={80} />
        }else{
            modalBody = this.props.modalBody;
        }
        return(
            <React.Fragment>
                <div className={'modalAlert'}>
                    <div className={'headModal'}>
                        <h1 className={'textHeadModal ' + this.props.status}>
                            {this.props.modalTitle}
                        </h1>
                        <FontAwesomeIcon onClick={()=>{console.log('close modal'), this.props.close()}} className={'iconHead'} icon={faTimesCircle} />
                    </div>
                    <h2 className={'textBodyModal'}>
                        {modalBody}
                    </h2>

                </div>
            </React.Fragment>
        )
    }
}
export default ModalAlert;