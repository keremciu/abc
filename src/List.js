import React, { Component } from 'react';

// material-ui elements
import {
    // import table elements
    Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
} from 'material-ui';

// data handler
import data from '../dataset.json';
import { findItem, expander } from './helpers';
const tree = expander(data);

import ListItem from './ListItem';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: tree
        };
        this.expandItem = this.expandItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    expandItem(get) {
        /*
            `expanded` property of `parent object` needs to be true
            `expanded` property shows `open` or `close` icon on parent object
            `expand` property of `children` needs to be true
            `expand` property show/hide the table rows of children
        */
        let newData = this.state.data;

        // find the item
        const find = findItem(newData, get.ID);

        // first time give it a expanded property
        if (find.expanded === undefined) {
            find.expanded = true;
        } else {
        // second time change the property 
            find.expanded = !find.expanded;
        }

        // expand all children
        find.children = find.children.map((Child) => {
            // first time give it a expand property
            if (Child.expand === undefined) {
                Child.expand = true;
            } else {
            // second time change the property
                Child.expand = !Child.expand;
            }
            return Child;
        });

        this.setState({
            data: newData
        });
    }

    deleteItem(get) {
        let newData = this.state.data;
        console.log('naber');

        // findkey
        const find = findItem(newData, get.ID);

        find.deleted = true;

        console.log(newData);

        this.setState({
            data: newData
        });
    }

    printTree(data, level) {
        const self = this;
        level++;

        return data.map((Item, key) => {
            if (Item.deleted) return;

            return (
            [
                <ListItem
                    key={key}
                    Item={Item}
                    level={level}
                    handleExpand={this.expandItem}
                    handleDelete={this.deleteItem}
                />,
                self.printTree(Item.children, level)
            ]
            )
        })
    }

    render() {
        const { data } = this.state;
        return (
            <div style={{ marginBottom: '10px' }}>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>Show Children</TableHeaderColumn>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Phone</TableHeaderColumn>
                            <TableHeaderColumn>City</TableHeaderColumn>
                            <TableHeaderColumn>Delete</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                    >
                    {this.printTree(data, 0)} 
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default List;