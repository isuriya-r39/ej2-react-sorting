import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GridComponent, Sort, Inject,Page,Group,Selection,Edit,Reorder } from '@syncfusion/ej2-react-grids';
import './App.css';

let data: Object[] = [
    { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5 },
    { OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6 },
    { OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4 }];

export default class App extends React.Component<{}, {}> {
  constructor(props) {
        super(props);
        this.gridColumns = [];
        this.columns = [
            { field: 'OrderID', headerText: 'Action', width: 125,   },
            { field: 'CustomerName', headerText: 'ID', width: 200 },
            { field: 'ShippedDate', headerText: 'Name', width: 150 },
             ];
            this.whyColumn = [
            { field: 'ShipCountry', headerText: 'ShipCountry', width: 80,  }
        ];
     
        this.edit={allowAdding:true,allowEditing:true}
        this.settings = {
            SelectionSettingsModel: { type: 'single' }
        }
       // this.sortingOptions = { columns: [{ field: 'OrderID', direction: 'decending' }, { field: 'CustomerName', direction: 'ascending' }] };
            //this.gridColumns = [...this.columns, ...this.whyColumn];
            }
            
        constructGridColumns(state) {
      
        let classKeys = [];
        let n=state.list.length;
        for (let i = 0; i <n; i++) {
            const keyEdited = "Order" +i;
            const headerText ="Order" +i ;
            const type = Object.assign({}, { field: keyEdited, headerText: headerText, width: 200 });
            classKeys = classKeys.push(type);
        }
        return classKeys;
    }
     componentWillReceiveProps(nextProps) {
     debugger
      
      this.propChangecolumn = nextProps.columns; 
        //const classColumns = this.constructGridColumns(nextProps.columns);        
       this.gridColumns = [...this.gridColumns,  ...this.propChangecolumn];
        this.setState(this.gridColumns);
       // console.log('nextProps', nextProps, ...this.addColumn1,this.gridColumns);
    }
      componentWillMount() {
    
        const classColumns = this.constructGridColumns(this.state);
        this.gridColumns = [...this.columns, ...this.addColumn, ...this.whyColumn];
        this.gridColumns.splice(3,1)
    }
    
    componentDidMount(){
  
    this.gridColumns = [...this.columns,...this.whyColumn];
    }
   
  public state: Object[] = {list: data.slice(0, 1), columns:[{field:"Freight",headerText:"Freight"}]};
 public props: Object[] = {height: 400};
  
 public acceptedGrid: GridComponent;

    render() {
      const gridHeight = typeof this.props.height !== 'undefined' ? this.props.height : 300;
        return (
            <div className='control-pane'>
                <div className='control-section'>
                 
                    <GridComponent dataSource={this.state.list}
                    columns = {this.gridColumns }
                    sortSettings={this.sortingOptions}
                    selectionSettings={this.settings}
                    ref={g => this.acceptedGrid = g}
                    allowSorting = {true}
                    editSettings={this.edit}
                    allowPaging ={true}
                    allowReorder={true}
                    allowSelection={false}
                    />
                    <Inject services={[Sort,Page,Group,Reorder,Selection,Edit]} />
                </div>

            </div>
        )
    }
}
class Wrap extends React.Component<{}, {}> { 

  constructor(props){
  super(props)
  this.state = { columns:[{field:"Freight",headerText:"Freight"}]};
  }
  click() {
     debugger;
    this.setState({columns:[{field:"Freight",headerText:"Freight"}]});
  }
  
  render(){
    return (<div>
    <input onClick={this.click.bind(this)} type='button' value='Prop change'/>
    <Sorting columns={this.state.columns}/>
    </div>);
  }
  
}
}
ReactDOM.render(<App />, document.getElementById('grid'));