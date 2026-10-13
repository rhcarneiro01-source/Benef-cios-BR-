import { useEffect, useState } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Inicio from './src/telas/Inicio';
import Perguntas from './src/telas/Perguntas';
import Resultado from './src/telas/Resultado';
import Sobre from './src/telas/Sobre';
import { RESPOSTAS_PADRAO } from './src/regras';
import { cores } from './src/tema';

export default function App() {
  const [tela, setTela] = useState('inicio'); // inicio | perguntas | resultado | sobre
  const [voltarPara, setVoltarPara] = useState('inicio');
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState(RESPOSTAS_PADRAO);

  const setResposta = (campo, valor) => setRespostas((r) => ({ ...r, [campo]: valor }));

  const abrirSobre = () => {
    setVoltarPara(tela);
    setTela('sobre');
  };

  // Botão "voltar" do Android navega entre as telas em vez de fechar o app.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (tela === 'inicio') return false;
      if (tela === 'sobre') setTela(voltarPara);
      else if (tela === 'perguntas' && etapa > 0) setEtapa(etapa - 1);
      else if (tela === 'perguntas') setTela('inicio');
      else if (tela === 'resultado') {
        setEtapa(2);
        setTela('perguntas');
      }
      return true;
    });
    return () => sub.remove();
  }, [tela, etapa, voltarPara]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.raiz} edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        {tela === 'inicio' && (
          <Inicio
            onComecar={() => {
              setEtapa(0);
              setTela('perguntas');
            }}
            onSobre={abrirSobre}
          />
        )}
        {tela === 'perguntas' && (
          <Perguntas
            etapa={etapa}
            setEtapa={setEtapa}
            respostas={respostas}
            setResposta={setResposta}
            onConcluir={() => setTela('resultado')}
            onVoltar={() => setTela('inicio')}
          />
        )}
        {tela === 'resultado' && (
          <Resultado
            respostas={respostas}
            setResposta={setResposta}
            onRefazer={() => {
              setEtapa(0);
              setTela('perguntas');
            }}
            onSobre={abrirSobre}
          />
        )}
        {tela === 'sobre' && <Sobre onVoltar={() => setTela(voltarPara)} />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  raiz: { flex: 1, backgroundColor: cores.fundo },
});
