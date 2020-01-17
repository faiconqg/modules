import React from 'react'
import Typography from '@material-ui/core/Typography'
import TabNavigation from 'modules/components/templates/TabNavigation'
import TabItem from 'modules/components/molecules/TabItem'
import Section from 'modules/components/molecules/Section'
import ResponsiveButton from 'modules/components/atoms/ResponsiveButton'
import Add from '@material-ui/icons/Add'
import { DataGrid, DataGridColumn } from 'modules/libs/DataGrid'

const SampleTab: React.FC = () => {
  return (
    <TabNavigation header="Tabs Page">
      <TabItem title="First Tab">
        <Section title="Data Grid">
          <DataGrid
            clientSide
            rows={simulateData}
            controlBar={
              <ResponsiveButton
                label="New Item"
                icon={Add}
                color="primary"
                onClick={() => console.log('add click')}
              />
            }
          >
            <DataGridColumn
              title="Location"
              field="location"
              width={120}
              searchable
            />
            <DataGridColumn title="Name" field="name" width={160} searchable />
            <DataGridColumn
              title="Date"
              field="created"
              formatter="dateTime"
              width={156}
              searchable
            />
            <DataGridColumn
              title="Type"
              field="template.description"
              searchable
            />
          </DataGrid>
        </Section>
      </TabItem>
      <TabItem title="Long tab">
        <h1>Lorem ipsum dolor sit amet consectetuer adipiscing elit</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa
          <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
          nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
          enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
          dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
          tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
          enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
          Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
          ullamcorper ultricies nisi.
        </p>
        <h1>Lorem ipsum dolor sit amet consectetuer adipiscing elit</h1>
        <h2>Aenean commodo ligula eget dolor aenean massa</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem.
        </p>
        <h2>Aenean commodo ligula eget dolor aenean massa</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem.
        </p>
        <ul>
          <li>Lorem ipsum dolor sit amet consectetuer.</li>
          <li>Aenean commodo ligula eget dolor.</li>
          <li>Aenean massa cum sociis natoque penatibus.</li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem.
        </p>
        <table>
          <tr>
            <th>Entry Header 1</th>
            <th>Entry Header 2</th>
            <th>Entry Header 3</th>
            <th>Entry Header 4</th>
          </tr>
          <tr>
            <td>Entry First Line 1</td>
            <td>Entry First Line 2</td>
            <td>Entry First Line 3</td>
            <td>Entry First Line 4</td>
          </tr>
          <tr>
            <td>Entry Line 1</td>
            <td>Entry Line 2</td>
            <td>Entry Line 3</td>
            <td>Entry Line 4</td>
          </tr>
          <tr>
            <td>Entry Last Line 1</td>
            <td>Entry Last Line 2</td>
            <td>Entry Last Line 3</td>
            <td>Entry Last Line 4</td>
          </tr>
        </table>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem.
        </p>
        <h1>Lorem ipsum dolor sit amet consectetuer adipiscing elit</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa
          <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
          nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
          enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
          dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
          tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
          enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
          Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
          ullamcorper ultricies nisi.
        </p>
        <h1>Lorem ipsum dolor sit amet consectetuer adipiscing elit</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa
          <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
          nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
          enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
          dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
          tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
          enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
          Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
          ullamcorper ultricies nisi.
        </p>
        <h1>Lorem ipsum dolor sit amet consectetuer adipiscing elit</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa
          <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
          nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
          enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
          dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
          tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
          enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
          Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
          ullamcorper ultricies nisi.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa
          <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
          nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
          enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
          dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
          tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
          enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
          Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
          ullamcorper ultricies nisi.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa
          <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
          nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
          enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
          dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
          tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
          enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
          Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
          ullamcorper ultricies nisi.
        </p>
      </TabItem>
      <TabItem title="Simple tab">
        <Typography>Test</Typography>
      </TabItem>
    </TabNavigation>
  )
}

export default SampleTab

const simulateData: any = [
  {
    location: 'Brazil',
    name: 'Caipirinha',
    created: new Date(2019, 9),
    template: { description: 'Drink' }
  },
  {
    location: 'USA',
    name: 'Baseball',
    created: new Date(2020, 0, 3),
    template: { description: 'Sport' }
  },
  {
    location: 'France',
    name: 'Eiffel Tower',
    created: new Date(),
    template: { description: 'Tourist Attraction' }
  }
]
