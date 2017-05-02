import * as React from "react";
import { sp } from "sp-pnp-js";
import { default as RiskList } from "./RiskList";
import { default as RiskMatrix } from "./RiskMatrix";

export interface IRiskOverviewProps {
    viewName: string;
}

export interface IRiskOverviewState {
    items: any[];
    itemsAsHtml?: any[];
    columns: any[];
}

export class RiskOverview extends React.Component<IRiskOverviewProps, IRiskOverviewState> {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            columns: null,
        };
    }

    public componentDidMount(): void {
        const { viewName } = this.props;
        let list = sp.web.lists.getByTitle(__("Lists_Uncertainties_Title"));
        Promise.all([
            list.items.filter(`startswith(ContentTypeId,'0x010088578E7470CC4AA68D566346483107020101')`).expand("FieldValuesAsHtml").get(),
            list.fields.get(),
            list.views.getByTitle(viewName).expand("ViewFields").get(),
        ]).then(([items, fields, view]) => {
            let columns: any[] = view.ViewFields.Items.results.map(viewField => {
                let [field] = fields.filter(f => f.InternalName === viewField.replace("Link", ""));
                if (field) {
                    return ({
                        key: viewField,
                        fieldName: field.InternalName,
                        name: field.Title,
                        minWidth: 100,
                    });
                }
                return null;
            });
            this.setState({
                items: items,
                itemsAsHtml: items.map(i => i.FieldValuesAsHtml),
                columns: columns.filter(c => c),
            });
        });
    }

    public render(): JSX.Element {
        let { items, itemsAsHtml, columns } = this.state;
        if (items && columns) {
            return (<div>
                <RiskMatrix items={items} />
                <RiskList items={itemsAsHtml} columns={columns} />
            </div>);
        }
        return null;
    }
}

export default RiskOverview;


