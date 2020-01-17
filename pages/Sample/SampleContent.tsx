import React from 'react'
import Add from '@material-ui/icons/Add'
import { DataGrid, DataGridColumn } from 'modules/libs/DataGrid'
import ResponsiveButton from 'modules/components/atoms/ResponsiveButton'
import Section from 'modules/components/molecules/Section'
import Panel from 'modules/components/molecules/Panel'
import Accessibility from '@material-ui/icons/BubbleChart'
import AccountBalance from '@material-ui/icons/AccountBalance'
import Apartment from '@material-ui/icons/Apartment'
import CloudDone from '@material-ui/icons/CloudDone'
import Check from '@material-ui/icons/Check'
import BarChart from '@material-ui/icons/BarChart'
import Android from '@material-ui/icons/Android'
import DoubleArrow from '@material-ui/icons/DoubleArrow'
import Public from '@material-ui/icons/Public'
import {
  Typography,
  Button,
  Grid,
  TableRow,
  MenuItem,
  Link
} from '@material-ui/core'
import PanelItem from 'modules/components/molecules/PanelItem'
import TextButton from 'modules/components/atoms/TextButton'
import InfoValue from 'modules/components/molecules/InfoValue'
import SimpleTable from 'modules/components/molecules/SimpleTable'
import SimpleTableCell from 'modules/components/molecules/SimpleTableCell'
import AvatarLabel from 'modules/components/molecules/AvatarLabel'
import { ResponsiveLine } from '@nivo/line'
import Div from 'modules/components/molecules/Div'
import SimpleMenu from 'modules/components/molecules/SimpleMenu'
import Image from 'modules/components/molecules/Image'
import DateTimeFormatter from 'modules/utils/formatters/DateTimeFormatter'

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

let simulateData2: any = [
  {
    id: 1,
    color: 'rgb(103, 58, 183)',
    app: 'Incentivendas',
    dau: 528,
    retention: 0
  },
  {
    id: 2,
    color: 'rgb(255, 143, 0)',
    app: 'Incentivendas Positivo',
    dau: 391,
    retention: 0
  },
  {
    id: 3,
    color: 'rgb(77, 182, 172)',
    app: 'Plataforma Interligados',
    dau: 0,
    retention: 0
  }
]

const hasOfflineData = true

const SampleContent: React.FC = () => {
  return (
    <>
      <Section>
        <Panel
          left={
            <TextButton
              startIcon={<BarChart />}
              onClick={() => console.log('teste')}
            >
              Analytics
            </TextButton>
          }
          right={
            <SimpleMenu>
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </SimpleMenu>
          }
          footer={
            <SimpleTable>
              {simulateData2.map((data: any) => (
                <TableRow hover key={data.id}>
                  <SimpleTableCell bold>
                    <AvatarLabel
                      label={data.app}
                      iconClass={Android}
                      colorRaw={data.color}
                    />
                  </SimpleTableCell>
                  <SimpleTableCell noPadRight width={38}>
                    DAU
                  </SimpleTableCell>
                  <SimpleTableCell bold dark>
                    {data.dau}
                  </SimpleTableCell>
                  <SimpleTableCell noPadRight width={160}>
                    Retenção no primeiro dia
                  </SimpleTableCell>
                  <SimpleTableCell bold dark>
                    {data.retention}%
                  </SimpleTableCell>
                  <SimpleTableCell>Receita</SimpleTableCell>
                </TableRow>
              ))}
            </SimpleTable>
          }
          spacing={2}
        >
          <Grid item xs={12} sm={4}>
            <InfoValue
              strongLabel
              label="Usuários ativos por dia"
              value="1,1 mil"
              secondaryValue="+3,7%"
              color="textPrimary"
            />

            <Div minHeight="md" flex fix>
              <ResponsiveLine
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                xScale={{ type: 'point' }}
                yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: false,
                  reverse: false
                }}
                gridYValues={[0, 140, 280]}
                enableGridX={false}
                enablePoints={false}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
                colors={{ scheme: 'nivo' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
              />
            </Div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoValue
              strongLabel
              label="Retenção primeiro dia"
              value="0%"
              secondaryValue="-100%"
              color="textPrimary"
            />
            <Div minHeight="md" flex fix>
              <ResponsiveLine
                data={data2}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                xScale={{ type: 'point' }}
                yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: false,
                  reverse: false
                }}
                gridYValues={[0, 140, 280]}
                enableGridX={false}
                enablePoints={false}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
                colors={{ scheme: 'nivo' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
              />
            </Div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Div flex paddingTop="spacing4">
              <Image
                size={154}
                src="https://www.gstatic.com/analytics/20180327-00/app/static/mobile/ZeroStateIcons/zero-state-iap.png"
              ></Image>
              <Div flex direction="column" justify="center">
                Track your revenue
                <br />
                <br />
                <Link>Link para a AdMob</Link>
                <Link>Vincular ao Goolge Play</Link>
              </Div>
            </Div>
          </Grid>
        </Panel>
      </Section>

      <Section>
        <Panel
          invert
          spacing={2}
          left={
            <TextButton
              invert
              startIcon={<Accessibility />}
              onClick={() => console.log('teste')}
            >
              Dados offline
            </TextButton>
          }
          rightTitle={DateTimeFormatter(new Date())}
        >
          {hasOfflineData ? (
            <>
              <PanelItem
                invert
                xs={6}
                icon={<AccountBalance fontSize="small" />}
                title="Redes"
              >
                TEST1, TEST2
              </PanelItem>
              <PanelItem
                xs={6}
                invert
                icon={<Apartment fontSize="small" />}
                title="Lojas"
              >
                145
              </PanelItem>
            </>
          ) : (
            <Grid item>
              <Typography variant="body2" paragraph>
                Não existem dados disponíveis offline.
              </Typography>
              <Button variant="outlined" color="inherit">
                Selecionar dados offline
              </Button>
            </Grid>
          )}
        </Panel>
      </Section>

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

      <Section title="Desenvolver">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Panel icon={<Public />} title="Desenvolver" spacing={2}>
              <PanelItem
                xs={6}
                icon={<Check fontSize="small" />}
                title="Cloud Messaging"
                rightTitle={DateTimeFormatter(new Date())}
              >
                <Grid container>
                  <InfoValue label="Enviadas" value={5549} padLeft />
                  <InfoValue value={<DoubleArrow />} />
                  <InfoValue label="Abertas" value="5,7%" color="primaryDark" />
                  <InfoValue value={<DoubleArrow />} />
                  <InfoValue label="Conversões" value="0%" color="primary" />
                </Grid>
              </PanelItem>
              <PanelItem
                xs={6}
                onClick={() => console.log('teste')}
                icon={<Check fontSize="small" />}
                title="Mensagem sem nome"
                rightTitle={DateTimeFormatter(new Date())}
              >
                <Grid container>
                  <InfoValue label="Enviadas" value={4813} padLeft />
                  <InfoValue value={<DoubleArrow />} />
                  <InfoValue
                    label="Abertas"
                    value="16,2%"
                    color="primaryDark"
                  />
                  <InfoValue value={<DoubleArrow />} />
                  <InfoValue label="Conversões" value="0%" color="primary" />
                </Grid>
              </PanelItem>
            </Panel>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Panel icon={<Public />} title="Desenvolver">
              <PanelItem
                icon={<Check fontSize="small" />}
                title="Cloud Messaging"
                rightTitle={DateTimeFormatter(new Date())}
              >
                <Grid container>
                  <InfoValue label="Enviadas" value={5549} padLeft />
                  <InfoValue value={<DoubleArrow />} />
                  <InfoValue label="Abertas" value="5,7%" color="primaryDark" />
                  <InfoValue value={<DoubleArrow />} />
                  <InfoValue label="Conversões" value="0%" color="primary" />
                </Grid>
              </PanelItem>
            </Panel>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Panel icon={<Public />} title="Desenvolver">
              <PanelItem
                icon={<Check fontSize="small" />}
                title="Cloud Messaging"
                rightTitle={DateTimeFormatter(new Date())}
              >
                <Grid container>
                  <InfoValue label="Enviadas" value={5549} padLeft />
                  <InfoValue value={<DoubleArrow />} />
                  <InfoValue label="Abertas" value="5,7%" color="primaryDark" />
                  <InfoValue value={<DoubleArrow />} />
                  <InfoValue label="Conversões" value="0%" color="primary" />
                </Grid>
              </PanelItem>
            </Panel>
          </Grid>
        </Grid>
      </Section>

      <Section title="Ampliar">
        <Panel icon={<CloudDone />} title="Cloud Messaging" spacing={2}>
          <PanelItem
            xs={12}
            sm={6}
            icon={<Check fontSize="small" />}
            title="Cloud Messaging"
            rightTitle={DateTimeFormatter(new Date())}
          >
            <Grid container>
              <InfoValue label="Enviadas" value={5549} padLeft />
              <InfoValue value={<DoubleArrow />} />
              <InfoValue label="Abertas" value="5,7%" color="primaryDark" />
              <InfoValue value={<DoubleArrow />} />
              <InfoValue label="Conversões" value="0%" color="primary" />
            </Grid>
          </PanelItem>
          <PanelItem
            xs={12}
            sm={6}
            icon={<Check fontSize="small" />}
            title="Mensagem sem nome"
            rightTitle={DateTimeFormatter(new Date())}
          >
            <Grid container>
              <InfoValue label="Enviadas" value={4813} padLeft />
              <InfoValue value={<DoubleArrow />} />
              <InfoValue label="Abertas" value="16,2%" color="primaryDark" />
              <InfoValue value={<DoubleArrow />} />
              <InfoValue label="Conversões" value="0%" color="primary" />
            </Grid>
          </PanelItem>
        </Panel>
      </Section>
    </>
  )
}

export default SampleContent

const data = [
  {
    id: 'japan',
    color: 'hsl(32, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 247
      },
      {
        x: 'helicopter',
        y: 38
      },
      {
        x: 'boat',
        y: 114
      },
      {
        x: 'train',
        y: 271
      },
      {
        x: 'subway',
        y: 18
      },
      {
        x: 'bus',
        y: 268
      },
      {
        x: 'car',
        y: 124
      },
      {
        x: 'moto',
        y: 36
      },
      {
        x: 'bicycle',
        y: 134
      },
      {
        x: 'horse',
        y: 81
      },
      {
        x: 'skateboard',
        y: 212
      },
      {
        x: 'others',
        y: 65
      }
    ]
  },
  {
    id: 'france',
    color: 'hsl(251, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 234
      },
      {
        x: 'helicopter',
        y: 75
      },
      {
        x: 'boat',
        y: 61
      },
      {
        x: 'train',
        y: 242
      },
      {
        x: 'subway',
        y: 1
      },
      {
        x: 'bus',
        y: 22
      },
      {
        x: 'car',
        y: 204
      },
      {
        x: 'moto',
        y: 210
      },
      {
        x: 'bicycle',
        y: 80
      },
      {
        x: 'horse',
        y: 250
      },
      {
        x: 'skateboard',
        y: 209
      },
      {
        x: 'others',
        y: 77
      }
    ]
  },
  {
    id: 'us',
    color: 'hsl(162, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 13
      },
      {
        x: 'helicopter',
        y: 192
      },
      {
        x: 'boat',
        y: 155
      },
      {
        x: 'train',
        y: 288
      },
      {
        x: 'subway',
        y: 1
      },
      {
        x: 'bus',
        y: 227
      },
      {
        x: 'car',
        y: 253
      },
      {
        x: 'moto',
        y: 171
      },
      {
        x: 'bicycle',
        y: 299
      },
      {
        x: 'horse',
        y: 235
      },
      {
        x: 'skateboard',
        y: 290
      },
      {
        x: 'others',
        y: 228
      }
    ]
  },
  {
    id: 'germany',
    color: 'hsl(354, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 153
      },
      {
        x: 'helicopter',
        y: 211
      },
      {
        x: 'boat',
        y: 166
      },
      {
        x: 'train',
        y: 189
      },
      {
        x: 'subway',
        y: 219
      },
      {
        x: 'bus',
        y: 220
      },
      {
        x: 'car',
        y: 126
      },
      {
        x: 'moto',
        y: 240
      },
      {
        x: 'bicycle',
        y: 153
      },
      {
        x: 'horse',
        y: 258
      },
      {
        x: 'skateboard',
        y: 52
      },
      {
        x: 'others',
        y: 257
      }
    ]
  },
  {
    id: 'norway',
    color: 'hsl(221, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 273
      },
      {
        x: 'helicopter',
        y: 273
      },
      {
        x: 'boat',
        y: 272
      },
      {
        x: 'train',
        y: 223
      },
      {
        x: 'subway',
        y: 202
      },
      {
        x: 'bus',
        y: 238
      },
      {
        x: 'car',
        y: 177
      },
      {
        x: 'moto',
        y: 65
      },
      {
        x: 'bicycle',
        y: 149
      },
      {
        x: 'horse',
        y: 86
      },
      {
        x: 'skateboard',
        y: 3
      },
      {
        x: 'others',
        y: 65
      }
    ]
  }
]

const data2 = [
  {
    id: 'japan',
    color: 'hsl(32, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 271
      },
      {
        x: 'helicopter',
        y: 138
      },
      {
        x: 'boat',
        y: 14
      },
      {
        x: 'train',
        y: 171
      },
      {
        x: 'subway',
        y: 218
      },
      {
        x: 'bus',
        y: 168
      },
      {
        x: 'car',
        y: 24
      },
      {
        x: 'moto',
        y: 236
      },
      {
        x: 'bicycle',
        y: 234
      },
      {
        x: 'horse',
        y: 181
      },
      {
        x: 'skateboard',
        y: 12
      },
      {
        x: 'others',
        y: 165
      }
    ]
  },
  {
    id: 'france',
    color: 'hsl(251, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 34
      },
      {
        x: 'helicopter',
        y: 175
      },
      {
        x: 'boat',
        y: 161
      },
      {
        x: 'train',
        y: 42
      },
      {
        x: 'subway',
        y: 190
      },
      {
        x: 'bus',
        y: 220
      },
      {
        x: 'car',
        y: 224
      },
      {
        x: 'moto',
        y: 110
      },
      {
        x: 'bicycle',
        y: 180
      },
      {
        x: 'horse',
        y: 50
      },
      {
        x: 'skateboard',
        y: 109
      },
      {
        x: 'others',
        y: 271
      }
    ]
  },
  {
    id: 'us',
    color: 'hsl(162, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 131
      },
      {
        x: 'helicopter',
        y: 19
      },
      {
        x: 'boat',
        y: 15
      },
      {
        x: 'train',
        y: 28
      },
      {
        x: 'subway',
        y: 123
      },
      {
        x: 'bus',
        y: 22
      },
      {
        x: 'car',
        y: 233
      },
      {
        x: 'moto',
        y: 191
      },
      {
        x: 'bicycle',
        y: 99
      },
      {
        x: 'horse',
        y: 135
      },
      {
        x: 'skateboard',
        y: 290
      },
      {
        x: 'others',
        y: 128
      }
    ]
  }
]
