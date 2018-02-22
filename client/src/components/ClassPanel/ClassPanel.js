import React from "react";
import "./ClassPanel.css";

const ClassPanel = props =>
<div className="panel panel-default">
  <div className="panel-heading" data-toggle="collapse" href={`#${props.category}${props.name}panel`} data-target={`#${props.category}${props.name}panel`} data-parent="#resultsPanel">
      <div className="row">
          <div className="col-sm-4">
              <a className="panel-title" data-toggle="collapse" data-parent="#resultsPanel" href={`#${props.category}${props.name}panel`}>{props.name}</a>
          </div>
          <div className="col-sm-8">
              <ul className="breadcrumb pull-right">
                  <li>
                      Class
                  </li>
                  <li>
                      {props.category}
                  </li>
                  <li className="active">
                      <a href={props.link} target="_blank">{props.name}</a>
                  </li>
                  <li className="active notebadge" data-category={props.category} data-name={props.name}>
                      <a data-category={props.category} data-name={props.name}>Notes 
                      </a>
                  </li>
              </ul>
          </div>
      </div>
  </div>
  <div id={`${props.category}${props.name}panel`} className="panel-collapse collapse">
      <div className="panel-body">
          <a href={props.link}>Link</a>
          <br />
          {props.description}
      </div>
  </div>
</div>;

export default ClassPanel;



