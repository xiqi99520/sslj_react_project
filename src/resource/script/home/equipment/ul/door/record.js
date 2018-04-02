var my$;
import {Base} from './../../../../connect.js';
import {SetCookie,GetCookie} from "./../../../../cookie.js";
class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }
  componentDidMount(){
	  var date=new Date();
  }
  render() {
    return (
      <div className="curtains_wrapper"> 
      	<p className="head_nav">
      		<img className="url_back" src="../../../src/resource/images/url_back.png" />
      		开锁记录
      	</p>
  		{
  			this.state.data.map(function(item,index){
  				return (
  						<div className="dr_part">
	  		  		    	<p className="dr_date">2017年4月20日</p>
	  		  		    	<ul className="dr_ul">
	  		  		    		<li>
	  		  		    			<p className="dr_msg">
	  		  		    				<span className="dr_pointer"></span>null用指纹开锁
	  		  		    			</p>
	  		  		    			<p className="dr_time">
	  		  		    				15:12:01
	  		  		    			</p>
	  		  		    		</li>
	  		  		    		<li>
	  		  		    			<p className="dr_msg">
	  		  		    				<span className="dr_pointer"></span>null用指纹开锁
	  		  		    			</p>
	  		  		    			<p className="dr_time">
	  		  		    				15:12:01
	  		  		    			</p>
	  		  		    		</li>
	  		  		    	</ul>
	  		  		    </div>
  				)
  			})
  		}
	    <div className="dr_part">
	    	<p className="dr_date">2017年4月20日</p>
	    	<ul className="dr_ul">
	    		<li>
	    			<p className="dr_msg">
	    				<span className="dr_pointer"></span>null用指纹开锁
	    			</p>
	    			<p className="dr_time">
	    				15:12:01
	    			</p>
	    		</li>
	    		<li>
	    			<p className="dr_msg">
	    				<span className="dr_pointer"></span>null用指纹开锁
	    			</p>
	    			<p className="dr_time">
	    				15:12:01
	    			</p>
	    		</li>
	    	</ul>
	    </div>
	    <div className="dr_part">
	    	<p className="dr_date">2017年4月20日</p>
	    	<ul className="dr_ul">
	    		<li>
	    			<p className="dr_msg">
	    				<span className="dr_pointer"></span>null用指纹开锁
	    			</p>
	    			<p className="dr_time">
	    				15:12:01
	    			</p>
	    		</li>
	    		<li>
					<p className="dr_msg">
						<span className="dr_pointer"></span>null用指纹开锁
					</p>
					<p className="dr_time">
						15:12:01
					</p>
				</li>
	    	</ul>
	    </div>
      </div>
    );
  }
}
export default Record
