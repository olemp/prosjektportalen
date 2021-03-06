import * as React from "react";
import RESOURCE_MANAGER from "../../../../Resources";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PhaseModel } from "../../ProjectPhasesData";

export interface IGoToChecklistLinkProps {
    phase: PhaseModel;
}

const GoToChecklistLink = ({ phase }: IGoToChecklistLinkProps) => {
    return (
        <li>
            <a href={`${phase.Checklist.defaultViewUrl}?FilterField1=GtProjectPhase&FilterValue1=${encodeURIComponent(phase.Name)}`}>
                <Icon iconName="BulletedList" />
                <span style={{ marginLeft: 5 }}>{RESOURCE_MANAGER.getResource("ProjectPhases_GoToChecklist")}</span>
            </a>
        </li>
    );
};

export default GoToChecklistLink;
