import React, { Component } from 'react';

// material-ui elements
import {
    // import table elements
    Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
} from 'material-ui';

// data handler
import data from '../dataset.json';
import expander from './helpers';
const tree = expander(data);

import ListItem from './ListItem';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: tree
        };
        this.expandItem = this.expandItem.bind(this);
    }

    expandItem(get) {
        const newData = this.state.data.map((Item) => {
            if (Item.ID === get.ID) {
                if (Item.expanded === undefined) {
                    Item.expanded = true;
                } else {
                    Item.expanded = !Item.expanded;
                }
                Item.children = Item.children.map((Child) => {
                    if (Child.expand === undefined) {
                        Child.expand = true;
                    } else {
                        Child.expand = !Child.expand;
                    }
                    return Child;
                });
            }
            return Item;
        });

        this.setState({
            data: newData
        });
    }

    printTree(data, level) {
        const self = this;
        level++;

        return data.map((Item, key) => (
            [
                <ListItem
                    key={key}
                    Item={Item}
                    level={level}
                    handleExpand={this.expandItem}
                />,
                self.printTree(Item.children, level)
            ]
        ))
    }

    render() {
        const { data } = this.state;
        console.log(data);
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