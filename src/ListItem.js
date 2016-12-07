import React, { Component } from 'react';

// material-ui elements
import {
    // import table elements
    TableRow, TableRowColumn,
    // for expand button
    IconButton
} from 'material-ui';

import OpenIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import CloseIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class ListItem extends Component {

    static defaultProps = {
        closeIcon: <CloseIcon />,
        openIcon: <OpenIcon />,
        deleteIcon: <DeleteIcon />,
    };

    onExpanding = (ID) => {
        this.props.handleExpand({
            ID,
        });
    }

    render() {
        const { Item, level } = this.props;
        let rowClass = `tableRow tableRow${level}`;

        if (Item.expand === true) rowClass += ' expanded'; 

        return (
            <TableRow className={rowClass}>
                <TableRowColumn>
                {
                    Item.children.length > 0 && (
                        <IconButton
                            onClick={this.onExpanding.bind(this, Item.ID)}
                        >
                            {Item.expanded ? this.props.openIcon : this.props.closeIcon}
                        </IconButton>
                    )
                }
                </TableRowColumn>
                <TableRowColumn>{Item.ID}</TableRowColumn>
                <TableRowColumn>{Item.Name}</TableRowColumn>
                <TableRowColumn>{Item.Phone}</TableRowColumn>
                <TableRowColumn>{Item.City}</TableRowColumn>
                <TableRowColumn>
                    <IconButton
                        onTouchTap={this.onDelete}
                    >
                        {this.props.deleteIcon}
                    </IconButton>
                </TableRowColumn>
            </TableRow>
        )
    }
}

export default ListItem;