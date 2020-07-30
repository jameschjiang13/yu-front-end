import React from 'react'
import './App.css';
import StocksContainer from './Components/StocksContainer'
import { Route, Switch } from "react-router-dom";
import SearchBar from './Components/SearchBar';
import Filter from './Components/Filter';
import StockShow from './Components/StockShow'
import NotFound from './Components/NotFound'
import Form from './Components/Form'
import UserProfile from './Components/UserProfile';
import {withRouter} from 'react-router-dom'

import Header from './Components/Header'

class App extends React.Component {

  state = {
    user: {
      id: 0,
      username: "",
      manageable_fund: 0,
      stocks: [], 
      portfolio_lists: []
    },
    token: "",
    stockList: [],
    searchedTerm: "",
    filterTerm: "", 
  }

  //_____________________________________

  componentDidMount() {
    fetch("http://localhost:4000/stocks")
    .then((resp) => resp.json())
    .then(stocksArr => {
      this.setState({
        stockList: stocksArr
    })
    })
  
    if (localStorage.token) {
      fetch("http://localhost:4000/users/stay_logged_in",{
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(resp => resp.json())
      .then(this.handleResponse)
    }
  }

  // Routes

    decideWhichStockToRender =(routerProps) => {
      let userInput = routerProps.match.params.symbol
      let stockFound = this.state.stockList.find((stock) => {
        return stock.Symbol.toLocaleLowerCase() === userInput
      }
      )
      if (stockFound) {
        return <div>
        <StockShow
        key  = {stockFound.id}
        id  = {stockFound.id}
        name = {stockFound.Name}
        symbol = {stockFound.Symbol}
        sector = {stockFound.Sector}
        user = {this.state.user}

        orderFunction={this.submitOrder}
        />
        </div>
      } else {
        return <NotFound/>
      }
    }

    //Routes end

    //search and filter

      search = (keyword) => {
        this.setState({
          searchedTerm: keyword
        })
      }

      filter = (keyword) => {
        this.setState({
          filterTerm: keyword
        })
      }
      
      
      selectStock = () => {

        let arr = this.state.stockList.filter((stockObj) => {
          return stockObj.Name.toLowerCase().includes(this.state.searchedTerm.toLowerCase()) 
          || stockObj.Symbol.toLowerCase().includes(this.state.searchedTerm.toLowerCase())
          || stockObj.Sector.toLowerCase().includes(this.state.searchedTerm.toLowerCase())
        }
        )

        arr = arr.filter((stockObj) => {
          return stockObj.Sector.toLowerCase().includes(this.state.filterTerm.toLowerCase())
        }
        )
        return arr
      }

    //Search and Filter End


    //Auth

      loginSubmit = (userInfo) => {
        fetch("http://localhost:4000/login", {
          method: "POST",
          headers:{
            "content-type": "application/json"
          }, 
          body: JSON.stringify(userInfo)
        })
        .then(resp => resp.json())
        .then(this.handleResponse)
      }
      

      registerSubmit = (userInfo) => {
        fetch("http://localhost:4000/users", {
          method: "POST",
          headers:{
            "content-type": "application/json"
          }, 
          body: JSON.stringify(userInfo)
        })
        .then(resp => resp.json())
        .then(this.handleResponse)
      }
      
      handleResponse = (resp) => {
        if (resp.user) {
          localStorage.token = resp.token
          this.setState({
            user: resp.user,
            token: resp.token
          }, () => {
            this.props.history.push("/profile")
          }
          )
        } else (
          alert(resp.error)
        )
      }

      renderProfile = (routerProps) => {
        if (this.state.token) {
          return <UserProfile
          userObj = {this.state.user}
          deleteFunction = {this.deletePortfolioList}
          />
        } else {
          this.props.history.push("/login")
        }
      }

      handleLogout = () => {
        this.setState({
          token: ""
        })
      }
      
    //Auth End

    //Submit Buy/Sell Forms
      submitOrder = (orderObj) => {
        fetch(`http://localhost:4000/users/${this.state.user.id}`, {
          method: "PATCH", 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.state.token
          },
          body: JSON.stringify({
            manageable_fund: this.state.user.manageable_fund - orderObj.price*orderObj.volume
          }
        )})

        fetch("http://localhost:4000/portfolio_lists", {
          method: "POST", 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.state.token
          },
          body: JSON.stringify(orderObj)
        })
        .then(resp => resp.json())
        .then(newOrderObj => this.changePortfolioState(newOrderObj))
      }
      
      changePortfolioState = (newOrderObj) => {
        console.log(newOrderObj)
        this.setState((prevState) => {
          this.props.history.push("/profile")
          return {
            user: {
              id: prevState.user.id,
              username: prevState.user.username,
              manageable_fund: prevState.user.manageable_fund - newOrderObj.price*newOrderObj.volume,
              stocks: prevState.user.stocks, 
              portfolio_lists: [...prevState.user.portfolio_lists, newOrderObj]
            }
          }
        }
        )
      }

    //Submit Buy/Sell Forms End

    // Delete a portfolio list
      deletePortfolioList = (portfolioObj) => {
        fetch(`http://localhost:4000/portfolio_lists/${portfolioObj.id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.state.token
          }
        }
        )
        .then(resp => resp.json())
        .then(deletedPortfolioObj => this.deletePortfolioFromState(deletedPortfolioObj))
      }
      
      deletePortfolioFromState = (deletedPortfolioObj) => {
        let newArr = this.state.user.portfolio_lists.filter((portfolio_list) => {
          return portfolio_list.id !== deletedPortfolioObj.id
        }
        )

        this.setState((prevState) => {
          return {
            user: {
              id: prevState.user.id,
              username: prevState.user.username,
              manageable_fund: prevState.user.manageable_fund,
              stocks: prevState.user.stocks, 
              portfolio_lists: newArr
            }
          }
        }
        )
      }
      


    // End of Delete

    
    

  render() {
    let arrToReturn = this.selectStock()
    return (
      <div class="App">
        <Header
        token = {this.state.token}
        logoutFunction = {this.handleLogout}
        />
        <Switch>

          <Route path="/login">
            <Form
            formName = "Log In"
            submitFunction ={this.loginSubmit}
            />
          </Route>

          <Route path="/register">
            <Form
            formName = "Register"
            submitFunction ={this.registerSubmit}
            />
          </Route>

          <Route path="/profile" render={this.renderProfile}></Route>
          
          <Route path="/:symbol" render={this.decideWhichStockToRender}/>

          <Route path="/" exact>

         <div class="top-stuff">
            <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-2">
                  <Filter
                  filterFunction = {this.filter}
                  />
              </div>
              <div class="col-sm-5">
                  <SearchBar
                  searchedTerm = {this.state.searchedTerm}
                  searchFunction = {this.search}
                  />
              </div>   
            </div>
          </div>
            <StocksContainer
            StocksList={arrToReturn}
            />
          </Route>

        </Switch>
     
        

      </div>
    )
      }
}

let MagicalComponent = withRouter(App)
export default MagicalComponent
