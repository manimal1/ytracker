import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SectionTitle from './SectionTitle';

const ExpansionPanelGroup = ({ label, classes, children, }) => {

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <SectionTitle text={label} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div style={{width: "100%"}}>
          { children }
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default ExpansionPanelGroup;
