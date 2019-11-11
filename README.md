# react-list-hooks
React Components for handling item selection in a list. This is based on compound components pattern with hooks and context where state is implicitly handled.

## Demo
You can customize your list styling and add sub lists to any level down. No need to worry about the state, that will be handled by **react-list-hooks**. 

Check box list             |  Button List             
:-------------------------:|:-------------------------:
![Check box demo](https://drive.google.com/uc?export=view&id=1WPMRXRzj18ORQ0Xb9zKEWsWqc083kTcd)   |  ![Button list demo](https://drive.google.com/uc?export=view&id=1H78rKEsZ_q-FLsJXHrhauhYsUkBn4Kt5)

## Getting Started

### General prerequisites 
 * React 16.8+
 
### Installation
See [npm documentation](https://docs.npmjs.com/) on how to get started with npm.
```bash
npm install --save react-list-hooks
```
### Using
#### Basic usage example
Import into your React project and render a list:
```bash
//CSS File
.is-disabled {pointer-event: none; opacity: 0.5;}
```

```bash
//JS File
import { ListContext, List, ListItem, ToggleSubList, ToggleListItem } from 'react-list-hooks';

const TextWithCheckBox = ({isSelected, id, displayValue, customClass}) => {
    const {updateList} = useContext(ListContext);
    return (
        <div className={customClass} onClick={() => updateList(id)}>
            <input type="checkbox" checked={isSelected} />
            <span>{displayValue}</span>
        </div>
    )
};

class App extends Component {
  render() {
    return (
      <div>  
          <h1>Fruits List</h1>  
           <List>
                <ListItem id='apple'>
                    <TextWithCheckBox displayValue='Apple' />
                </ListItem>
                    {/*Sub List enable/disable based on parent list item id*/}
                    <ToggleSubList whenActive='apple' disableClass='is-disabled'>
                        <List customClass='sub-list'>
                            <ListItem id='red'>
                                <TextWithCheckBox displayValue='Red Apple' />
                            </ListItem>
                            <ListItem id='green'>
                                <TextWithCheckBox displayValue='Green Apple' />
                            </ListItem>
                        </List>
                    </ToggleSubList>
                <ListItem id='banana'>
                    <TextWithCheckBox displayValue='Banana' />
                </ListItem>
                <ListItem id='orange'>
                    <TextWithCheckBox displayValue='Orange' />
                </ListItem>
                {/*List Item enable/disable based on sibling list item id*/}
                <ToggleListItem id='sour' whenActive='orange' disableClass='is-disabled'>
                    <ListItem id='sour'>
                        <TextWithCheckBox displayValue='Sour Orange' />
                    </ListItem>
                </ToggleListItem>
            </List>
      </div>
    );
  }
}

export default App;
```
#### Components
* **List** - A component that renders the list of items.
    
  Available options with example values:
  ```bash
    <List 
        initialState = {[1, 3, 10]}
        onListUpdate = {(list) => console.log('Selected Items', list)}
        clearList = {false}
        customClass = 'has-green-background'
    >
        <ListItem>...</ListItem>
    </List>
  ```  
  **Options Detail:**
  
  Parameter | Type | Required | Defaults | Description 
  :--------:|:-----:|:-------:|:--------:|:-----------:
  initialState| Array | no | [] | Array of pre-selected items. 
  onListUpdate| Funtion| no | - | Passed function will call each type list updates.
  clearList| Boolean | no | false | Prop passed to clear the list
  customClass| String | no | - | Custom class for the list wrapper div.
  
* **ListItem** - A component that renders a single item in a list. Anyone can select/deselect list from it's children component. 

  Available options with example values:
  ```bash
    <ListItem id = {1}>
    ...    
    </ListItem>
  ```  
  **Options Detail:**
    
  Parameter | Type | Required | Defaults | Description 
  :--------:|:-----:|:-------:|:--------:|:-----------:
  id| Any | yes | - | Unique item id.   
  
* **ToggleSubList** - A component that enable/disable a sub list based on its parent list item ID.

  Available options with example values:
  ```bash
    <ToggleSubList whenActive={2} disableClass='is-disabled'>
        <List>...</List>    
    </ToggleSubList>
  ```  
  **Options Detail:**
    
  Parameter | Type | Required | Defaults | Description 
  :--------:|:-----:|:-------:|:--------:|:-----------:
  whenActive| Any | yes | - | Pass parent item id to this prop to enable/disable a sublist.      
  disableClass| string | no | - | Sub list disable class e.g 'is-display-none'.      

* **ToggleListItem** - A component that enable/disable a item in a same list based on its sibling item ID. 

  Available options with example values:
  ```bash
    <ToggleListItem id='apple' whenActive='fruits' disableClass='is-disabled'>
        <ListItem>...</ListItem> 
    </ToggleListItem>
  ```  
  **Options Detail:**
    
  Parameter | Type | Required | Defaults | Description 
  :--------:|:-----:|:-------:|:--------:|:-----------:
  id | Any | yes | - | List Item Id (you want to disable).
  whenActive| Any | yes | - | Pass sibling item id to this prop to enable/disable a list item.      
  disableClass| string | no | - | List item disable class e.g 'is-disabled'.      
