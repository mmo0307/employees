import React, { Component } from 'react'

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import  AppFilter from  '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            data: 
                [
                    {id: 1, name: 'Misha Mishin', salary: 900, increase: false, rise: false},
                    {id: 2, name: 'Alex Boryh', salary: 300, increase: true, rise: true},
                    {id: 3, name: 'Vitalik Neterin', salary: 6700, increase: false, rise: false}
                ],
                term: '',
                filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
           // const index = data.findIndex(el => el.id === id);
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newArr = [...before, ...after];

            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

     addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
           data: data.map(item => {
               if(item.id === id){
                   return {...item, increase: !item.increase}
               }
               return item;
           })
        }));
    }

    onToggleRise = (id)  => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id){
                    return {...item, rise: !item.rise}
                }
                return item;
            })
        }));
    }

    searchEmp = (items, term) => {
        if(term.length === 0){
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch(filter){
            case 'rise':{
                return items.filter(item => item.rise);
            }
            case 'moreThen1000':{
                return items.filter(item => item.salary > 1000)
            }
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

  render() {
        const {data, term, filter} = this.state;
        const employers = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo 
                    employers={employers} 
                    increased={increased}
                />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>  
                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}/>
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
        );
  }
}

export default App;