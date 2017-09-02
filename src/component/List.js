import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const List = ({classes, items}) => {
    return (
        <div className={classnames(classes)}>
            {items}
        </div>
    );
}

List.propTypes = {
    classes: PropTypes.any,
    items: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default List;