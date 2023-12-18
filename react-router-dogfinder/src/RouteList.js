import React from 'react'

const RouteList = ({dogList}) => {
    return (
        <Switch>
          <Route exact path="/dogs" >
            <DogList list={dogList}/> 
          </Route>
          <Route path="/dogs/:name" >
            <DogDetails dogs={dogList}/>
          </Route>
          <Redirect to="/dogs" />
        </Switch>
    );
}