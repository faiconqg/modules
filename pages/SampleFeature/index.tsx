import React from 'react'
import HelpIcon from '@material-ui/icons/Help'
import FeaturePage from 'modules/components/templates/FeaturePage'
import ButtonList from 'modules/components/organisms/ButtonList'
import Section from 'modules/components/molecules/Section'
import { Grid } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import WorkIcon from '@material-ui/icons/Work'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'
import ButtonListItem from 'modules/components/molecules/ButtonListItem'
import Youtube from 'modules/components/atoms/Youtube'
import FeatureCard from 'modules/components/molecules/FeatureCard'
import feature from './feature.png'
import feature1 from './feature1.png'
import feature2 from './feature2.png'
import feature3 from './feature3.png'

const SampleFeature: React.FC = () => {
  return (
    <FeaturePage
      header="Schedule"
      title="Storage"
      description="Armazenar e recuperar arquivos gerados pelo usuário, como imagens, áudio e vídeos, sem o código do servidor"
      buttonLabel="Criar banco de dados"
      action={() => console.log('clicou2')}
      color="rgb(0, 151, 167)"
      image={feature}
      buttons={[
        {
          label: 'Outro',
          action: () => console.log('clicou')
        },
        {
          label: 'Ajuda',
          action: () => console.log('clicou'),
          icon: <HelpIcon />
        }
      ]}
    >
      <Section title="Saiba mais" divider>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ButtonList fullHeight>
              <ButtonListItem
                iconClass={ImageIcon}
                color="primary"
                primary="Como começar?"
                secondary="Ver a documentação"
              />
              <ButtonListItem
                iconClass={WorkIcon}
                color="secondary"
                primary="Como o Storage funciona?"
                secondary="Ver a documentação"
              />
              <ButtonListItem
                iconClass={BeachAccessIcon}
                color="primaryDark"
                primary="Em que o Storage pode ser útil para mim?"
                secondary="Saiba mais"
              />
            </ButtonList>
          </Grid>
          <Grid item xs={12} md={8}>
            <Youtube code="_tyjqozrEPY" />
          </Grid>
        </Grid>
      </Section>
      <Section title="Mais recursos para desenvolvedores">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FeatureCard
              image={feature1}
              primary="Authentication"
              secondary="Autenticar e gerenciar usuários"
              color="#ab60b8"
              onClick={() => console.log('click feature1')}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              image={feature2}
              primary="Cloud Firestore"
              secondary="Atualizações em tempo real, consultas eficientes e escalonamento automático"
              color="#ef6c00"
              onClick={() => console.log('click feature2')}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              image={feature3}
              primary="Hosting"
              secondary="Implantar apps da Web em segundos"
              color="#172568"
              onClick={() => console.log('click feature3')}
            />
          </Grid>
        </Grid>
      </Section>
    </FeaturePage>
  )
}

export default SampleFeature
