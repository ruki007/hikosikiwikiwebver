#include<bits/stdc++.h>
#define ll long long
#define s_int signed
#define yes cout<<"Yes"<<endl;
#define no cout<<"No"<<endl;
#define Cans cout<<ans<<endl;
using namespace std;
int main(){

int N,Q;
cin>>N>>Q;
vector<pair<ll,ll>> A[Q]
vector<ll> S[N];
for(int i=0;i<N;++i)
{
    cin>>S[i];
}

for(int i=0;i<Q;++i)
{
    cin>>A[i].first;
    A[i].second=i;
}

sort(S.rbegin(),S.rend());
sort(A.rbegin(),A.rend());
int x,y=0;
int j=0;
vector<pair<ll,ll>> ans[Q]
for(int i=0;i<Q;++i)
{
    ans[i].first=A[i].second;
}
for(int i=0;i<Q;++i)
{
    while(S[i]<A[j])
    {
        ++j;
    }

    ans[i].second=j;
}

sort(ans.begin(),ans.end());

for(int i-0;i<Q;++i)
{
    cout<<ans[i].second<<endl;
}










return 0;
}