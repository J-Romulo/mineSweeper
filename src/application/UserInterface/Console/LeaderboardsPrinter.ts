export class LeaderboardsPrinter {
    printLeaderboard(records: { player: string, rounds: number, difficulty: 1|2|3 }[]) {
        console.log(`+++ Pontuações dificuldade ${records[0].difficulty} +++`)

        console.log('   Jogador                Rodadas')

        records.forEach((record, index) => {
            const playerName = record.player.padEnd(20); // Adjust the padding length as needed
            console.log(`${index + 1}. ${playerName}   ${record.rounds}`);
        });
    }
}