Elevator Pitch
--------------
**Token curated consensus-driven tamperproof ranking of blockchain projects**

## Inspiration
Blockchain industry is:
- moving fast
- unstructured
- hard to evaluate
- confusing for new users

Curation Network allows to rank dApps, blockchains and projects in a tamperproof conensus-driven manner via an Ethereum smart contract.

## What it does
Curation Network brings clarity and fair comparison of blockchain applications and projects to wider audience. 
Token-curated economic model guarantees objectivity and makes sure such rating can't be sybil attacked, spammed, tampered with or manipulated.

## How it works

![alt text](https://i.imgur.com/jOtRiyI.png "Process")

### 1. Commit phase

- Choose project
- Initiate voting for a project
- Commit X tokens 
- Predict this project to go ↑ or ↓ in ranking
- Commit phase duration is specified

### 2. Voting phase

Other users cast their encrypted votes and stake tokens.

Network commision is withheld.

### 3. Reveal phase

Everyone reveal their votes (↑ or ↓) and stake amount. 
Winning direction is determined.

### 4. Movement phase

Final direction (↑ or ↓) is calculated based on overall stakes:
1. Minority voters get their stake back minus commision.
2. Majority voters get their stake plus commision over the period* of ranking position changing.

![](https://latex.codecogs.com/svg.latex?E=E_0+atan(\frac{T_{min}*count_v}{avg\(S_i\)})*\frac{avg(S_i)}{T_{min}})

![](https://latex.codecogs.com/svg.latex?E_0) - initial speed
![](https://latex.codecogs.com/svg.latex?avg(S_i)) - average of all stakes
![](https://latex.codecogs.com/svg.latex?count_v) - # of votes during last 24h

## Presentation

https://docs.google.com/presentation/d/1u12_BLMNIhgUS1LbHQIzcKaUKeb9EiE02bJVfW0Z5ok/edit?usp=sharing
