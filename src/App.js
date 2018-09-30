import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {parse} from '@babel/parser';
import generate from 'babel-generator';
import traverse from "@babel/traverse";
import template from "babel-template";
// import SimpleSchema from 'simpl-schema';
 
// new SimpleSchema({
//   name: String,
// }).validate({
//   name: 2,
// });
class PersonViewer extends Component { render() { const { person } = this.props; return <div> name {person['name']},age {person['age']} </div>; } }
class App extends Component {
  render() {
    const personSchema = {
      name: String,
      age: Number
    }

    const keys = Object.keys(personSchema);

    const code = `class PersonViewer extends Component {
      render() {
        const { person } = this.props;
        return (
          <div>
            ${keys.map(key => `${key} {person['${key}']}`)}
          </div>
        );
      }
    }`;
    const buildThing = template(code, {
      plugins: ['jsx']
    });
    const ast = buildThing();
     
    // const ast = parse(code, {
    //   plugins: ['jsx']
    // });
     
    // traverse(ast, {
    //   enter(path) {
    //     if (path.node.type === "JSXElement") {
    //       console.log('boop', path.node)
    //     }
    //     if (path.isIdentifier({ name: "n" })) {
    //       path.node.name = "x";
    //     }
    //   }
    // });

    const output = generate(ast, { /* options */ }, code);
    return (
      <div>
        <p>{output.code}</p>
        <PersonViewer person={{ name: 'Max', age: 21 }} />
      </div>
    );
  }
}

export default App;
